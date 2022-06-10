from datetime import datetime
from sqlalchemy import TIMESTAMP, MetaData, Table, Column, String, Integer, Boolean, ForeignKey

metadata = MetaData()

users = Table(
    'users', metadata,
    Column("id",            Integer,        primary_key=True),
    Column("email",         String,         unique=True, nullable=False),
    Column("phone",         String,         unique=True, nullable=False),
    Column("first_name",    String,         nullable=True),
    Column("last_name",     String,         nullable=True),
    Column("visible_name",  String),
    Column("icon",          Integer,        ForeignKey("files.id"), nullable=True),
    Column("birthday",      TIMESTAMP,      nullable=True),
    Column("active",        Boolean,        default=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
    Column("updated_at",    TIMESTAMP,      default=datetime.now, onupdate=datetime.now),
)

workspaces = Table(
    "workspaces", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("title",         String(32),     nullable=False),
    Column("owner",         Integer,        ForeignKey("users.id")),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

tags = Table(
    "tags", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("title",         String(124),    nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

categories = Table(
    "categories", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("title",         String(124),    nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

# Links
links = Table(
    "links", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("title",         String(124),    nullable=True),
    Column("link",          String,         nullable=False),
    Column("content",       String,         nullable=True),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

# Notes
notes = Table(
    "notes", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("category",      Integer,        ForeignKey("categories.id"), nullable=False),
    Column("title",         String(124),    nullable=False),
    Column("content",       String,         nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
    Column("updated_at",    TIMESTAMP,      default=datetime.now, onupdate=datetime.now),
)

# Files
# file store in FileStorageService and return link, id, size, etc.
files = Table(
    "files", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("url",           String),
    Column("size",          Integer),       # Constraint: max file size 
    Column("format",        String(64)),
    Column("file_name",     String),
    Column("folder",        Integer,        ForeignKey("folders.id"), nullable=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

folders = Table(
    "folders", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("title",         String(64)),
    Column("workspace_id",  Integer,        ForeignKey("workspaces.id")),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
    Column("updated_at",    TIMESTAMP,      default=datetime.now, onupdate=datetime.now)
)

folder_parents = Table(
    "folder_parents", metadata,
    Column("folder_id",     Integer,        ForeignKey("folders.id"), nullable=False),
    Column("folder_parent_id", Integer,     ForeignKey("folders.id"), nullable=False),
)

# Bookshelf
books = Table(
    "books", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("file",          Integer,        ForeignKey("files.id"), nullable=False),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("folder",        Integer,        ForeignKey("folders.id"), nullable=True),
    Column("title",         String(124),    nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

# Contacts
# Not in db contact
contacts = Table(
    "contacts", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("email",         String,         nullable=False),
    Column("first_name",    String),
    Column("last_name",     String),
    Column("company",       String),
    Column("phone",         String),
    Column("note_id",       Integer,        ForeignKey("notes.id"), nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
    Column("updated_at",    TIMESTAMP,      default=datetime.now, onupdate=datetime.now),
)

# Many to many tables
# NOTE: owner_id needs to filter tags by user
note_tags = Table(
    "note_tags", metadata,
    Column("note_id",       Integer,        ForeignKey("notes.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
)

link_tags = Table(
    "link_tags", metadata,
    Column("link_id",       Integer,        ForeignKey("links.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
)

file_tags = Table(
    "file_tags", metadata,
    Column("file_id",       Integer,        ForeignKey("files.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
)

book_notes = Table(
    "book_notes", metadata,
    Column("book_id",       Integer,        ForeignKey("books.id"), nullable=False),
    Column("note_id",       Integer,        ForeignKey("notes.id"), nullable=False)
)

contact_tags = Table(
    "contact_tags", metadata,
    Column("contact_id",    Integer,        ForeignKey("contacts.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
)

# General meta table. Many entities has color, important flag, etc.
# Why not to store it in different table?
entity_meta = Table(
    "entity_meta", metadata,
    Column("entity_id",     Integer,        unique=True),
    Column("color",         String(6),      nullable=True),
    Column("important",     Boolean,        default=False),
    Column("bookmark",      Boolean,        default=False)
)
