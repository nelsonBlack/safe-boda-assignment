   
DROP TABLE IF EXISTS driver;
CREATE TABLE driver(
    id integer PRIMARY KEY,
    firstName character varying,
    middleName character varying,
    lastName character varying,
    phone character varying,
    email character varying,
    password character varying,
    rememberToken character varying,
    otpTime timestamp with time zone,
    createdAt timestamp without time zone,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone,
    suspended boolean
);

DROP TABLE IF EXISTS migrations;
CREATE TABLE migrations(
    id integer PRIMARY KEY,
    timestamp bigint,
    name character varying
);

DROP TABLE IF EXISTS passanger;
CREATE TABLE passanger(
    id integer PRIMARY KEY,
    firstName character varying,
    middleName character varying,
    lastName character varying,
    phone character varying,
    email character varying,
    password character varying,
    rememberToken character varying,
    otpTime timestamp with time zone,
    createdAt timestamp without time zone,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone
);

DROP TABLE IF EXISTS ride;
CREATE TABLE ride(
    id integer PRIMARY KEY,
    driverId integer,
    pickup point,
    destination point,
    rideStatus USER-DEFINED,
    passangerId integer
);

DROP TABLE IF EXISTS staff;
CREATE TABLE staff(
    id integer PRIMARY KEY,
    firstName character varying,
    middleName character varying,
    lastName character varying,
    phone character varying,
    email character varying,
    password character varying,
    rememberToken character varying,
    otpTime timestamp with time zone,
    createdAt timestamp without time zone,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone
);

DROP TABLE IF EXISTS typeorm_metadata;
CREATE TABLE typeorm_metadata(
    type character varying,
    database character varying,
    schema character varying,
    table character varying,
    name character varying,
    value text
);

DROP TABLE IF EXISTS user_base;
CREATE TABLE user_base(
    id integer PRIMARY KEY,
    firstName character varying,
    middleName character varying,
    lastName character varying,
    phone character varying,
    email character varying,
    password character varying,
    rememberToken character varying,
    otpTime timestamp with time zone,
    createdAt timestamp without time zone,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone
);

INSERT INTO driver(id,firstName,middleName,lastName,phone,email,password,rememberToken,otpTime,createdAt,updatedAt,deletedAt,suspended) VALUES(1,'John','Ousman','Doe','+380991234567','driver@mail.com','$2b$10$V4EVYgADvvM9p/hxQcoBFu2EXOh.KaiW.rtlMqte43TT58a63D/Rm',NULL,NULL,'2022-02-01 00:34:36.693417','2022-02-01 00:34:36.693417',NULL,NULL),(2,'yohn','5usman','yoe','+384591234567','driver2@mail.com','$2b$10$63mGenn./mGCJ/U76.3JpeYlPtcfGc833czqLlBjF6I1MUxGiyLKa',NULL,NULL,'2022-02-01 00:35:19.229761','2022-02-01 00:35:19.229761',NULL,NULL);

INSERT INTO migrations(id,timestamp,name) VALUES(1,'1643675494046','firstMigration1643675494046');

INSERT INTO passanger(id,firstName,middleName,lastName,phone,email,password,rememberToken,otpTime,createdAt,updatedAt,deletedAt) VALUES(1,'Brown','Blue','Pink','+380741234567','driver@mail.com','$2b$10$FVcLIFWknAR.P.T6eDbHquLkx/d6d/rg119ayOPjKnjFCG9OnbJTu',NULL,NULL,'2022-02-01 00:35:57.923208','2022-02-01 00:35:57.923208',NULL),(2,'lrown','llue','link','+380745234567','driver67@mail.com','$2b$10$O2bvA2O7IHpU3ibVIrNqZuGmsVDL.FSdIUuXTYmxHCAeuCNHDvrce',NULL,NULL,'2022-02-01 00:36:31.546847','2022-02-01 00:36:31.546847',NULL);


INSERT INTO staff(id,firstName,middleName,lastName,phone,email,password,rememberToken,otpTime,createdAt,updatedAt,deletedAt) VALUES(1,'Damilola','John','peter','08023456789','test@mail.comm','$2b$10$OdcHtpzRr3G.4Y5JA1O0muA1QMeqJ8vBL8KdTvh0Wtd2wc8ekCJyG',NULL,NULL,'2022-02-01 00:33:47.26579','2022-02-01 00:33:47.26579',NULL);
