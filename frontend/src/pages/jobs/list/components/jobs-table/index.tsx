import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { IconButton } from "@/components/ui/icon-button";
import { iconButtonVariants } from "@/components/ui/icon-button/consts";
import { JOB_STATUS_THEME } from "@/features/jobs/job.constants";
import type { JobsTableProps } from "./types";

export function JobsTable({ jobs, onRowClick, onDelete }: JobsTableProps) {
  return (
    <div className="min-h-0 grow overflow-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Experience</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                No jobs found.
              </td>
            </tr>
          )}
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => onRowClick(job.id)}
              className="cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
            >
              <td className="px-4 py-3 text-slate-900">{job.title}</td>
              <td className="px-4 py-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <CompanyAvatar name={job.company} />
                  <span>{job.company}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-700">{job.category.name}</td>
              <td className="px-4 py-3 text-slate-700">
                {job.experienceLevel}
              </td>
              <td className="px-4 py-3">
                <Badge theme={JOB_STATUS_THEME[job.status]}>{job.status}</Badge>
              </td>
              <td
                className="px-4 py-3"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center gap-1">
                  <Link
                    to={`/jobs/${job.id}/edit`}
                    aria-label="Edit job"
                    title="Edit job"
                    className={iconButtonVariants({ theme: "default" })}
                  >
                    <Pencil size={16} />
                  </Link>
                  <IconButton
                    icon={Trash2}
                    label="Delete job"
                    theme="danger"
                    onClick={() => onDelete(job.id, job.title)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
