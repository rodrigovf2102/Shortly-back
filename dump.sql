--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: URLs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."URLs" (
    id integer NOT NULL,
    url text,
    "shortUrl" character varying(15),
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: URLs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."URLs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: URLs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."URLs_id_seq" OWNED BY public."URLs".id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(150) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: userUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer
);


--
-- Name: userUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userUrls_id_seq" OWNED BY public."userUrls".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: URLs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."URLs" ALTER COLUMN id SET DEFAULT nextval('public."URLs_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: userUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls" ALTER COLUMN id SET DEFAULT nextval('public."userUrls_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: URLs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."URLs" VALUES (1, NULL, NULL, 1, 0, '2022-10-13 19:52:00.461317');
INSERT INTO public."URLs" VALUES (2, NULL, NULL, 2, 0, '2022-10-13 19:52:11.698279');
INSERT INTO public."URLs" VALUES (3, NULL, NULL, 3, 0, '2022-10-13 19:52:23.271895');
INSERT INTO public."URLs" VALUES (5, 'https://www.gmail.com', 'DvOTwzB0', 3, 9, '2022-10-13 19:55:10.861989');
INSERT INTO public."URLs" VALUES (7, 'https://www.yahoo.com', '1LXRI2ro', 2, 11, '2022-10-13 20:03:38.346483');
INSERT INTO public."URLs" VALUES (6, 'https://www.dofus.com', 'esWlYtHH', 2, 5, '2022-10-13 20:03:27.294623');
INSERT INTO public."URLs" VALUES (8, 'https://www.vivo.com', 'OJtHfJFA', 2, 0, '2022-10-14 09:19:49.528356');
INSERT INTO public."URLs" VALUES (9, 'https://www.vivo.com', 'f3dhMjtF', 2, 0, '2022-10-14 09:19:53.275935');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, 'ef2b87bd-47b8-47c8-be70-388cec29920d', '2022-10-13 19:53:20.277843');
INSERT INTO public.sessions VALUES (2, 2, '69b0a2ae-80c7-4b97-9ba3-e51bc30ef1d7', '2022-10-13 19:53:26.800112');
INSERT INTO public.sessions VALUES (3, 1, 'afad0a50-96c8-43f5-9053-a06fd77ca6fb', '2022-10-13 19:53:50.45029');


--
-- Data for Name: userUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."userUrls" VALUES (1, 1, 1);
INSERT INTO public."userUrls" VALUES (2, 2, 2);
INSERT INTO public."userUrls" VALUES (3, 3, 3);
INSERT INTO public."userUrls" VALUES (5, 3, 5);
INSERT INTO public."userUrls" VALUES (6, 2, 6);
INSERT INTO public."userUrls" VALUES (7, 2, 7);
INSERT INTO public."userUrls" VALUES (8, 2, 8);
INSERT INTO public."userUrls" VALUES (9, 2, 9);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$12$00d6yn8t6TwMZ/9yBousX.UEADzWKxdXNT9CMuXB1Wi/F5Xhv8.8.', '2022-10-13 19:52:00.459136');
INSERT INTO public.users VALUES (2, 'Rodrigo', 'rodrigo@driven.com.br', '$2b$12$BWRdGNEDmk7OxxpQvvgw9O63/9vcc8rqEfhpIYwaWpgE8N.9alrKq', '2022-10-13 19:52:11.693557');
INSERT INTO public.users VALUES (3, 'Malu', 'malu@driven.com.br', '$2b$12$OxK7eq.ObhN49sUB0EDODeFFqAE.afMZsk2J1GIT6izOGW.EapzY6', '2022-10-13 19:52:23.267871');


--
-- Name: URLs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."URLs_id_seq"', 9, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: userUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userUrls_id_seq"', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: URLs URLs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."URLs"
    ADD CONSTRAINT "URLs_pkey" PRIMARY KEY (id);


--
-- Name: URLs URLs_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."URLs"
    ADD CONSTRAINT "URLs_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: userUrls userUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls"
    ADD CONSTRAINT "userUrls_pkey" PRIMARY KEY (id);


--
-- Name: userUrls userUrls_urlId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls"
    ADD CONSTRAINT "userUrls_urlId_key" UNIQUE ("urlId");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: URLs URLs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."URLs"
    ADD CONSTRAINT "URLs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: userUrls userUrls_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls"
    ADD CONSTRAINT "userUrls_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public."URLs"(id);


--
-- Name: userUrls userUrls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls"
    ADD CONSTRAINT "userUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

