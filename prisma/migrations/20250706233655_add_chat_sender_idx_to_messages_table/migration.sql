-- CreateIndex
CREATE INDEX "chat_sender_idx" ON "messages"("chat_id", "sender_user_id");
