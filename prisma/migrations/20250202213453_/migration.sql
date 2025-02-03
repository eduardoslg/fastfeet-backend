-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DELIVERYMAN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING', 'RETIRED', 'DELIVERED', 'RETURNED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "cpf" VARCHAR(11) NOT NULL,
    "address_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DELIVERYMAN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "posted_at" TIMESTAMP(3),
    "retired_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "number" INTEGER,
    "neighborhood" VARCHAR(30) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "complement" VARCHAR(30),
    "description" VARCHAR(150),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
