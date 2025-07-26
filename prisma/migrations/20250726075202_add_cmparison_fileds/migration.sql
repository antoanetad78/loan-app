-- CreateTable
CREATE TABLE "ComparisonOffer" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "monthlyPayment" DOUBLE PRECISION NOT NULL,
    "totalRepayment" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ComparisonOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComparisonOffer" ADD CONSTRAINT "ComparisonOffer_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "ComparisonLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonOffer" ADD CONSTRAINT "ComparisonOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "LoanOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
