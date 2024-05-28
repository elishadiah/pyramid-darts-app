import Layout from "../../components/Layout";
import useFormSubmit from "../../hooks/useTopResultForm";
import TopResultForm from "../../components/Result/TopResultForm";
import TopFightResult from "../../components/Result/TopFightResult";
import SummaryModal from "../../components/Result/SummaryModal";
const TopChallengeResult = () => {
  const {
    isLoading,
    result,
    earnedAchievement,
    isSummaryModalOpen,
    handleSubmit,
    onCloseSummaryMdal,
    onChange,
    handleSave,
  } = useFormSubmit();

  return (
    <Layout currentNo={0}>
      <div className="mx-auto max-w-2xl p-8 mt-20 lg:max-w-4xl lg:px-12">
        <TopResultForm
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          onChange={onChange}
          handleSave={handleSave}
        />
        <TopFightResult isLoading={isLoading} result={result} />
        <SummaryModal
          isOpen={isSummaryModalOpen}
          onClose={onCloseSummaryMdal}
          summary={earnedAchievement}
          result={result}
        />
      </div>
    </Layout>
  );
};

export default TopChallengeResult;
