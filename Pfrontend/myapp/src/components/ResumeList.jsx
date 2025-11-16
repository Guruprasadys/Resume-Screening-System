import CandidateCard from "./CandidateCard";

export default function ResumeList({ candidates }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {candidates.map((c, idx) => (
        <CandidateCard key={idx} candidate={c} />
      ))}
    </div>
  );
}
