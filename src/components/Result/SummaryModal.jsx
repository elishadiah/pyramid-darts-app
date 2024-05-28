import Modal from "../Modal";
import images from "../../helper/images";
import Confetti from "../Confetti";
import AchievementModalBoard from "./AchievementModalBoard";
import UserAvatar from "./UserAvatar";

const SummaryModal = ({ isOpen, onClose, summary, result }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-wrap gap-4 z-50">
        <div className="w-full sm:w-48p">
          <div className="relative">
            <UserAvatar
              avatar={result?.user1?.init?.avatar}
              name={result?.user1?.name}
            />
            <img
              className="absolute top-0 w-8 h-8"
              src={images.FIRSTMEDAL}
              alt="first-medal"
            />
            <img
              className="absolute bottom-0 w-8 h-8"
              src={images.TROPHY}
              alt="first-medal"
            />
            <img
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8"
              src={images.GOLDCROWN}
              alt="first-medal"
            />
          </div>
          <AchievementModalBoard data={summary?.user1} />
        </div>
        <div className="w-full sm:w-48p">
          <div className="relative">
            <UserAvatar
              avatar={result?.user2?.init?.avatar}
              name={result?.user2?.name}
            />
            <img
              className="absolute top-0 right-0 w-8 h-8"
              src={images.SNDBADGE}
              alt="first-medal"
            />
          </div>
          <AchievementModalBoard data={summary?.user2} />
        </div>
        <Confetti />
      </div>
    </Modal>
  );
};

export default SummaryModal;
