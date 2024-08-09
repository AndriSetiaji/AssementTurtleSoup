CREATE DATABASE db_test_app;

CREATE TABLE public.conversations (
	id int4 DEFAULT nextval('conversation_id_seq'::regclass) NOT NULL,
	sender varchar(255) NOT NULL,
	receiver varchar(255) NOT NULL,
	value text NOT NULL,
	is_deleted bool DEFAULT false NULL,
	created_at timestamp DEFAULT CURRENT_DATE NULL,
	created_by varchar(255) NOT NULL,
	updated_at information_schema."time_stamp" NULL,
	CONSTRAINT conversation_pkey PRIMARY KEY (id)
);
