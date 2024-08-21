/*
  Warnings:

  - You are about to drop the `OrganizationType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `organization` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrganizationType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UnitOrganization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "badgeUrl" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Unit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "UnitOrganization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Unit_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UnitType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Unit_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Unit" ("authorId", "badgeUrl", "createdAt", "description", "id", "title", "typeId", "updatedAt") SELECT "authorId", "badgeUrl", "createdAt", "description", "id", "title", "typeId", "updatedAt" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
