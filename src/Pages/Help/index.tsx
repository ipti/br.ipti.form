import CardHelp from "../../Components/Card/CardHelp";
import ContentPage from "../../Components/ContentPage";
import Empty from "../../Components/Empty";
import Loading from "../../Components/Loading";
import { useFetchRequestHelp } from "../../Services/Help/query";
import { Padding } from "../../Styles/styles";

export type HelpType = HelpT[];

export interface HelpT {
  id: number;
  name: string;
  help_url: string;
  description: any;
  video_url: any;
  createdAt: string;
  updatedAt: string;
}

const Help = () => {
  const { data, isLoading } = useFetchRequestHelp();

  if (isLoading) return <Loading />;

  var help: HelpType = data;

  return (
    <ContentPage title="Ajuda" description="Visualização dos manuais de como o nosso sistema funciona.">
      <Padding padding="16px" />
      <div className="grid">
        {help.map((item, key) => {
          return (
            <div key={key} className="col-12 md:col-6">
              <CardHelp title={item.name} index={key + 1} link={item.help_url} />
            </div>
          );
        })}
      </div>
      {help?.length === 0 && <Empty title="Ajuda"/>}
    </ContentPage>
  );
};

export default Help;
