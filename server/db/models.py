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
    Column("icon",          String,         nullable=True),
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

notes_meta = Table(
    "notes_meta", metadata,
    Column("note_id",       Integer,        unique=True),
    Column("color",         String(6)),
    Column("important",     Boolean,        default=False),
    # TODO:
    # Think about it
    # Column("reminder",      Integer,        ForeignKey("reminders.id"))
    # RFC5545 recurring event format ( https://datatracker.ietf.org/doc/html/rfc5545 )
    # Column("recurring",      String)
)

# Files
# file store in FileStorageService and return link, id, size, etc.
files = Table(
    "files", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("url",           String),
    Column("size",          Integer),       # Constraint: max file size 
    Column("format",        String(64)),    # TODO: Enum pdf, text, images, xls, docs, etc.
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

# Bookshelf
books = Table(
    "books", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("file",          Integer,        ForeignKey("files.id"), nullable=False),
    Column("owner",         Integer,        ForeignKey("users.id"), nullable=False),
    Column("title",         String(124),    nullable=False),
    Column("created_at",    TIMESTAMP,      default=datetime.now),
)

# Contacts
# Not in db contact
contacts = Table(
    "contacts", metadata,
    Column("id",            Integer,        primary_key=True),
    Column("email",         String),
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
    Column("user_id",       Integer,        ForeignKey("users.id"), nullable=False),
    Column("note_id",       Integer,        ForeignKey("notes.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
    # tag_id should be owned by user_id
)

link_tags = Table(
    "link_tags", metadata,
    Column("user_id",       Integer,        ForeignKey("users.id"), nullable=False),
    Column("link_id",       Integer,        ForeignKey("links.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
    # tag_id should be owned by user_id
)

file_tags = Table(
    "file_tags", metadata,
    Column("user_id",       Integer,        ForeignKey("users.id"), nullable=False),
    Column("file_id",       Integer,        ForeignKey("files.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
    # tag_id should be owned by user_id
)

book_notes = Table(
    "book_notes", metadata,
    Column("user_id",       Integer,        ForeignKey("users.id"), nullable=False),
    Column("book_id",       Integer,        ForeignKey("books.id"), nullable=False),
    Column("note_id",       Integer,        ForeignKey("notes.id"), nullable=False)
    # note should be owned by user_id
)

contact_tags = Table(
    "contact_tags", metadata,
    Column("user_id",       Integer,        ForeignKey("users.id"), nullable=False),
    Column("contact_id",    Integer,        ForeignKey("contacts.id"), nullable=False),
    Column("tag_id",        Integer,        ForeignKey("tags.id"), nullable=False)
    # note should be owned by user_id
)
