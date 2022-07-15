import { useMutation } from 'react-query';
import { supabase } from 'supabase';

export type ReportCategoryType =
	| 'hate-speech'
	| 'vulgarisms'
	| 'spam'
	| 'others';

export type ReportType = 'comment' | 'article';

export type InsertReportType = {
	article_id: string;
	comment_id?: string;
	user_id: string;
	category: ReportCategoryType;
	description?: string;
	type: ReportType;
};

const insertReport = async ({
	article_id,
	comment_id,
	user_id,
	category,
	description,
	type,
}: InsertReportType) => {
	const { data: insertedReport, error: insertError } = await supabase
		.from<InsertReportType>('reports')
		.insert([
			{
				article_id,
				comment_id,
				user_id,
				category,
				description,
				type,
			},
		]);

	if (insertError) {
		throw new Error(insertError.message);
	}

	return insertedReport;
};

const useCreateReport = () => {
	return useMutation((reportData: InsertReportType) => insertReport(reportData));
};

export { useCreateReport };
