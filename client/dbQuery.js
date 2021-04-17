// create table:
// users
// CREATE TABLE users (id serial, f_name text, l_name text, email text, password text, primary key (id));
// posts
// (id serial, user_id int references users(id), content text, created_at timestamp, updated_at timestamp, primary key(id));
// likes
// CREATE TABLE likes (id serial, post_id int references posts(id), user_id int references users(id), primary key(id));
// follows
// CREATE TABLE follows (id serial, followee_id int references users(id), follower_id int references users(id), primary key(id));


// proxy
// "proxy": "http://localhost:3000",
// "proxy": "http://localhost:3001",