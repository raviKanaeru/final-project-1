CREATE TABLE "Reflections" (
	id SERIAL PRIMARY KEY,
	success VARCHAR(255),
	low_point VARCHAR(255),
	take_away VARCHAR(255),
	"UserId" INTEGER NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL,
	"updateAt" TIMESTAMPTZ NOT NULL,
	
	CONSTRAINT fk_user FOREIGN KEY ("UserId")
		REFERENCES public."Users"(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
)