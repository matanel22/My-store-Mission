import ButtonUI from "../common/ButtonUI";

interface FooterProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Footer = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  hasPrev,
  hasNext,
}: FooterProps) => {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          borderTop: "1px solid #ccc",
        }}
      >
        <ButtonUI onClick={onPrevPage} disabled={!hasPrev}>
          Prev page ({currentPage > 1 ? currentPage - 1 : "-"})
        </ButtonUI>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Page {currentPage} of {totalPages}
        </div>

        <ButtonUI onClick={onNextPage} disabled={!hasNext}>
          Next page ({currentPage < totalPages ? currentPage + 1 : "-"})
        </ButtonUI>
      </div>
    </footer>
  );
};

export default Footer;
