-- CreateTable
CREATE TABLE "dev_moklet_ai"."emergency_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "report_number" VARCHAR(50) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "caller_info" TEXT,
    "caller_phone" VARCHAR(20),
    "location" TEXT,
    "emergency_type" VARCHAR(50),
    "urgency_level" INTEGER,
    "description" TEXT,
    "structured_data" JSONB,
    "ai_recommendations" JSONB,
    "status" VARCHAR(20) DEFAULT 'BARU',
    "voice_file_path" TEXT,
    "response_sent" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emergency_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev_moklet_ai"."whatsapp_conversations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phone_number" VARCHAR(20) NOT NULL,
    "message_sid" VARCHAR(100),
    "message_body" TEXT,
    "message_type" VARCHAR(20),
    "media_url" TEXT,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "report_id" UUID,

    CONSTRAINT "whatsapp_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev_moklet_ai"."regulation_docs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "excerpt" TEXT,
    "url" TEXT,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "regulation_docs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emergency_reports_report_number_key" ON "dev_moklet_ai"."emergency_reports"("report_number");

-- CreateIndex
CREATE INDEX "idx_emergency_reports_status" ON "dev_moklet_ai"."emergency_reports"("status");

-- CreateIndex
CREATE INDEX "idx_emergency_reports_timestamp" ON "dev_moklet_ai"."emergency_reports"("timestamp");

-- CreateIndex
CREATE INDEX "idx_emergency_reports_urgency" ON "dev_moklet_ai"."emergency_reports"("urgency_level");

-- CreateIndex
CREATE INDEX "idx_whatsapp_phone" ON "dev_moklet_ai"."whatsapp_conversations"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "regulation_docs_title_key" ON "dev_moklet_ai"."regulation_docs"("title");

-- AddForeignKey
ALTER TABLE "dev_moklet_ai"."whatsapp_conversations" ADD CONSTRAINT "whatsapp_conversations_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "dev_moklet_ai"."emergency_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
