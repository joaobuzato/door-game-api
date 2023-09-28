
CREATE TABLE actions (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL DEFAULT '',
  `button_text` varchar(100) NOT NULL DEFAULT '',
  `element` varchar(100) NOT NULL DEFAULT '',
  `qtd` int NOT NULL DEFAULT '0',
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `conditions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `element1` varchar(100) NOT NULL DEFAULT '',
  `type` varchar(100) NOT NULL DEFAULT '',
  `element2` varchar(100) NOT NULL DEFAULT '',
  `action_id` int NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `doors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(100) NOT NULL DEFAULT '',
  `color` varchar(7) NOT NULL DEFAULT '',
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `extended_texts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sentence` varchar(100) NOT NULL DEFAULT '',
  `text` varchar(500) NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `text` varchar(1000) NOT NULL DEFAULT '',
  `path` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
);

CREATE TABLE users (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  username varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT ''
  
);

INSERT INTO users VALUES (1, 'joaobuzato', 'Buzato42');

INSERT INTO `rooms` VALUES (1,'test title','test text','0000'),(2,'second test title','second test text','0001'),(3,'third test title','third test text','0002');
INSERT INTO conditions VALUES (1,'element1','type','element2',1),(2,'faca','greater','1',1);
INSERT INTO `extended_texts` VALUES (1,'test sentence','test text',1),(2,'test sentence nananana','test text nanana',1),(3,'test sentence 3','test text 3',2),(4,'test sentence nananana','test text nanana',1),(5,'sentence1','text1',1),(6,'sentence1','text1',1),(7,'sentence1','text1',1),(8,'sentence1','text1',1),(9,'sentence1','text1',1),(10,'sentence1','text1',1),(11,'test sentence nananana','test text nanana',1),(12,'test sentence nananana','test text nanana',1);
INSERT INTO `actions` VALUES (1,'get','Pegar Faca','faca',1,1),(2,'get','Pegar Faca','faca',1,2),(3,'get','button_text','faca',4,3),(4,'get','button_text','faca',4,3);
