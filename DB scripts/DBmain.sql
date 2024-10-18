use blogging_website;

drop table blogs;
-- Step 1: Create the user_role table first
create table user_role (
    id int auto_increment primary key,
    user_role_name varchar(100) not null
);
create table categories (
    id int auto_increment primary key,
    category_name varchar(100) not null
);
create table sub_categories (
    id int auto_increment primary key,
    sub_category_name varchar(100) not null
);

create table user_permissions (
    id int auto_increment primary key,
    role_id int not null,
    permission_name varchar(255) not null,
    
);


-- Step 2: Create the users table with a foreign key reference to user_role
create table users (
    id int auto_increment primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    username varchar(255) not null,
    email varchar(255) unique not null,
    user_password varchar(100) not null,
    user_role_id int not null,
    user_status tinyint default 1,
    created_on datetime default current_timestamp,
    
);

-- Step 3: Create the blogs table
create table blogs (
    id int auto_increment primary key,
    title varchar(255) not null,
    description text,
    image_url varchar(255),
    created_by int not null,
    modified_by int not null,
    category_id int not null,
    sub_category_id int not null,
    created_on datetime default current_timestamp,
    modified_on datetime default current_timestamp,
    status enum('Draft', 'Published', 'Archived') default 'Draft',
   
);



