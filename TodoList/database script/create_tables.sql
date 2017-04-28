create table `items` (
`id` int(11) not null auto_increment,
`title` varchar(255) collate utf8_unicode_ci Default null,
`description` text collate utf8_unicode_ci,
`user_id` int(11) Default null,
`created_at` datetime Default null,
`updated_at` datetime Default null,
primary key (`id`)
);