import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderTitle, SectionHeaderContainer } from '../../common/Section/types';
import JoinGameCard from '../../components/JoinGameCard';
import { AllPossibleWegaTypes, HexishString } from '../../models';
import { useFirebaseData } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer';
import { BADGE_TEXTS } from "../../common/JoinableGameBar";
import { FloatingOrbs } from "../../common/FloatingOrbs"
import 'twin.macro'; 

const JoinGamePage = () => {
  const params = useParams();
  const { game } = useFirebaseData(params.id as string);
  return game ? (
    <>
      <Helmet>
      <title>Join - {BADGE_TEXTS[game.gameType]} </title>
      </Helmet>
      <FloatingOrbs />
      <MainContainer tw="items-start">
        <Section 
        tw="self-center"
        direction='col'
        hdr={
          <SectionHeaderContainer tw='justify-center self-center'>
            <SectionHeaderTitle>Match wager</SectionHeaderTitle>
          </SectionHeaderContainer>}>
          <JoinGameCard 
            wagerType={game.wager.wagerType}  
            currencyType={game.wager.wagerCurrency}
            gameType={game.gameType.toUpperCase() as AllPossibleWegaTypes}
            wagerAmount={game.wager.wagerAmount}
            gameUuid={game.uuid}
            escrowId={game.wager.wagerHash as HexishString}
            gameId={game.id}
            gameAttributes={game.gameAttributes}
          />
        </Section>
      </MainContainer>
    </>
  ) : <ComponentLoader tw="min-w-[559px] min-h-[100vh]" />
}
export default JoinGamePage;

