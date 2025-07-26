-- CreateTable
CREATE TABLE "LoanOffer" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "maxAmount" INTEGER NOT NULL,
    "minAmount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "LoanOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestedAmount" INTEGER NOT NULL,
    "repaymentPeriod" INTEGER NOT NULL,
    "loanType" TEXT NOT NULL,

    CONSTRAINT "ComparisonLog_pkey" PRIMARY KEY ("id")
);
