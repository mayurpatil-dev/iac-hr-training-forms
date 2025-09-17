import RatingScale from "../RatingScale";

export default function EffectivenessMetricsSection({
  formData,
  handleInputChange,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <RatingScale
        value={formData.knowledgeRetention}
        onChange={(value) => handleInputChange("knowledgeRetention", value)}
        label="Knowledge Retention"
        description="How well did participants retain the training content?"
      />
      <RatingScale
        value={formData.skillImprovement}
        onChange={(value) => handleInputChange("skillImprovement", value)}
        label="Skill Improvement"
        description="Observable improvement in relevant skills"
      />
      <RatingScale
        value={formData.behaviorChange}
        onChange={(value) => handleInputChange("behaviorChange", value)}
        label="Behavior Change"
        description="Positive changes in workplace behavior"
      />
      <RatingScale
        value={formData.jobPerformance}
        onChange={(value) => handleInputChange("jobPerformance", value)}
        label="Job Performance Impact"
        description="Impact on individual job performance"
      />
      <RatingScale
        value={formData.teamCollaboration}
        onChange={(value) => handleInputChange("teamCollaboration", value)}
        label="Team Collaboration"
        description="Improvement in team collaboration and communication"
      />
    </div>
  );
}
