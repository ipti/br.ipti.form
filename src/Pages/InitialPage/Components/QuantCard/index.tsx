import CardQuant from "../../../../Components/Chart/CardQuant";

type QuantCardProps = {
  quant: number | string;
  color: "orange" | "blue" | "navy_blue";
  title: string;
};

export const QuantCard: React.FC<QuantCardProps> = ({
  quant,
  color,
  title,
}) => {
  return (
    <div className="col-12 md:col-4 lg:col-2">
      <CardQuant title={title} quant={quant} color={color} />
    </div>
  );
};
