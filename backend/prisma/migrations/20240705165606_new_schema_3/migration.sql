/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemDescription` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phone` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pincode` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL,
DROP COLUMN "pincode",
ADD COLUMN     "pincode" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "_CartToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToItem_AB_unique" ON "_CartToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToItem_B_index" ON "_CartToItem"("B");

-- AddForeignKey
ALTER TABLE "_CartToItem" ADD CONSTRAINT "_CartToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToItem" ADD CONSTRAINT "_CartToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
