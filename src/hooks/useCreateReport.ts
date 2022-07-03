import { useMutation } from 'react-query';
import { supabase } from 'supabase';

type CategoryType = 'hate-speech' | 'vulgarisms' | 'spam' | 'others';
type ReportType = 'commentsReports' | 'articlesReports';

export type InsertReportType = {
  article_id: string;
  user_id: string;
  category: CategoryType;
  description: string;
  reportType: ReportType;
};

const insertReport = async ({
  article_id,
  user_id,
  category,
  description,
  reportType,
}: InsertReportType) => {
  const { data: insertedReport, error: insertError } = await supabase
    .from<InsertReportType>(reportType)
    .insert([
      {
        article_id,
        user_id,
        category,
        description,
      },
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return insertedReport;
};

const useCreateReport = () => {
  return useMutation((reportData: InsertReportType) =>
    insertReport(reportData)
  );
};

export { useCreateReport };
