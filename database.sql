
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- USER can be student or teacher
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"first_name" varchar(60) NOT NULL,
	"last_name" varchar(60) NOT NULL,
	"email" VARCHAR(50) NOT NULL UNIQUE,
	"phone_number" VARCHAR(21) NOT NULL,
	"instrument" VARCHAR(80),
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"is_instructor" BOOLEAN DEFAULT FALSE NOT NULL,
	"instructor_is" integer,
	"profile_pic" varchar(255),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


-- PRACTICE LOG
CREATE TABLE "practice_log" (
	"id" serial NOT NULL,
	"user_id" integer,
	"date_of" DATE NOT NULL,
	"practice_length" integer,
	"topic" TEXT NOT NULL,
	"improved_on" TEXT NOT NULL,
	"weak_points" TEXT NOT NULL,
	"questions" varchar(255) NOT NULL,
	CONSTRAINT "practice_log_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



-- LESSON_PLAN
CREATE TABLE "lesson_plan" (
	"id" serial NOT NULL,
	"instrument_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"lesson_time" TIMESTAMP NOT NULL,
	"location_at" varchar(30) NOT NULL,
	"lesson_notes" TEXT NOT NULL,
	"assignment" varchar(255),
	"scheduled_at" TIMESTAMP NOT NULL,
	"due_at" TIMESTAMP NOT NULL,
	"submitted_url" TEXT,
	"submitted_at" TIMESTAMP,
	"submitted_comments" TEXT NOT NULL,
	CONSTRAINT "lesson_plan_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("instructor_is") REFERENCES "user"("id");


ALTER TABLE "lesson_plan" ADD CONSTRAINT "lesson_plan_fk1" FOREIGN KEY ("teacher_id") REFERENCES "user"("id");

ALTER TABLE "lesson_plan" ADD CONSTRAINT "lesson_plan_fk2" FOREIGN KEY ("student_id") REFERENCES "user"("id");

ALTER TABLE "practice_log" ADD CONSTRAINT "practice_log_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


-------------------------------------

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"first_name" varchar(60) NOT NULL,
	"last_name" varchar(60) NOT NULL,
	"email" TEXT(50) NOT NULL UNIQUE,
	"phone_number" integer(11) NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"is_instructor" BOOLEAN NOT NULL,
	"instructor_is" integer NOT NULL,
	"profile_pic" varchar(255),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "lesson_plan" (
	"id" serial NOT NULL,
	"instrument_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"lesson_time" TIMESTAMP NOT NULL,
	"location_at" varchar(30) NOT NULL,
	"lesson_notes" TEXT NOT NULL,
	"assignment" varchar(255),
	"scheduled_at" TIMESTAMP(10) NOT NULL,
	"due_at" TIMESTAMP NOT NULL,
	"submitted_url" TEXT NOT NULL,
	"submitted_at" TIMESTAMP NOT NULL,
	"submitted_comments" TEXT NOT NULL,
	CONSTRAINT "lesson_plan_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "instruments" (
	"id" serial NOT NULL,
	"instrument" varchar(30) NOT NULL,
	CONSTRAINT "instruments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "practice_log" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"date_of" TIMESTAMP NOT NULL,
	"practice_length" integer,
	"topic" TEXT NOT NULL,
	"improved_on" TEXT NOT NULL,
	"weak_points" TEXT NOT NULL,
	"questions" varchar(255) NOT NULL,
	CONSTRAINT "practice_log_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_intstrument" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "user_intstrument_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("instructor_is") REFERENCES "user"("id");

ALTER TABLE "lesson_plan" ADD CONSTRAINT "lesson_plan_fk0" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("id");
ALTER TABLE "lesson_plan" ADD CONSTRAINT "lesson_plan_fk1" FOREIGN KEY ("teacher_id") REFERENCES "user"("id");
ALTER TABLE "lesson_plan" ADD CONSTRAINT "lesson_plan_fk2" FOREIGN KEY ("student_id") REFERENCES "user"("id");

ALTER TABLE "instruments" ADD CONSTRAINT "instruments_fk0" FOREIGN KEY ("instrument") REFERENCES "user_intstrument"("id");

ALTER TABLE "practice_log" ADD CONSTRAINT "practice_log_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "user_intstrument" ADD CONSTRAINT "user_intstrument_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
