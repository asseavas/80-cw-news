create schema newsPortal collate utf8mb4_general_ci;
use newsPortal;

create table news
(
    id         int auto_increment
        primary key,
    title      varchar(255)           not null,
    text       text                   not null,
    image      varchar(255)           null,
    created_at DATETIME default NOW() null
);

create table comments
(
    id         int auto_increment
        primary key,
    news_id    int                    not null,
    author     varchar(255)           null,
    text       text                   not null,
    created_at DATETIME default NOW() null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade
);

insert into news (id, title, text, image, created_at)
values  (1, 'Зоопарк', 'В местном зоопарке появилась панда.', 'panda.jpg', '2024-08-24 15:02:21'),
        (2, 'Вирус оспы обезьян: что важно знать', 'По миру продолжает распространяться вирус обезьяньей оспы', 'img.jpeg', '2024-08-24 15:02:21'),
        (3, 'В школах бишкека новое расписание', 'Расписание новое', null, '2024-08-24 15:02:21'),
        (4, 'В аэропорт "Манас" поступило сообщение о бомбе. Всех эвакуируют', 'Бомбезно', 'manas.png', '2024-08-24 15:02:21');

insert into comments (id, news_id, author, text, created_at)
values  (1, 4, null, 'Там был чел с чехлом от гитары?', '2024-07-20 13:26:29'),
        (2, 3, 'dark_hero', 'Мне теперь до школы на крыльях лететь?', '2024-08-23 15:28:50'),
        (3, 1, null, 'Хочу погладить, они такие миленькие', '2024-08-24 16:28:50'),
        (4, 2, 'satoru', 'Это понятно, а каникулы будут', '2024-08-24 17:28:50');

