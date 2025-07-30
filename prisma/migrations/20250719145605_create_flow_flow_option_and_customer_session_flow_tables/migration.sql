-- CreateTable
CREATE TABLE "flows" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_terminal" BOOLEAN NOT NULL,

    CONSTRAINT "flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flow_options" (
    "id" SERIAL NOT NULL,
    "flow_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "next_flow_id" TEXT NOT NULL,

    CONSTRAINT "flow_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_session_flows" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "current_flow_id" TEXT NOT NULL,

    CONSTRAINT "customer_session_flows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flow_options" ADD CONSTRAINT "flow_options_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_session_flows" ADD CONSTRAINT "customer_session_flows_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_session_flows" ADD CONSTRAINT "customer_session_flows_current_flow_id_fkey" FOREIGN KEY ("current_flow_id") REFERENCES "flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
