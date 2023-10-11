import { Helmet } from 'react-helmet-async'; 
import Section from '../../common/Section';
import { SectionHeaderTitle, SectionHeaderContainer } from '../../common/Section/types';
import JoinGameCard from '../../components/JoinGameCard';
import { AllPossibleWegaTypes, HexishString } from '../../models';
import { SupportedWagerTokenAddresses } from '../../models/constants';
import { useWegaStore, useFirebaseData } from '../../hooks';
import { ComponentLoader } from '../../common/loaders'
import { useParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer';
import { BADGE_TEXTS } from "../../common/JoinableGameBar";
import { FloatingOrbs } from "../../common/FloatingOrbs"
import { utils } from 'ethers';
import 'twin.macro'; 

const JoinGamePage = () => {
  const { user, network, wallet } = useWegaStore();
  const params = useParams();
  const { game } = useFirebaseData(params.id as string);
  return (network?.id && wallet && user.uuid && game) ? (
    <div tw="min-w-[100vw] min-h-[100vh] relative">
      <Helmet>
      <title>Join - {BADGE_TEXTS[game.gameType]} </title>
      </Helmet>
      <FloatingOrbs />
      <MainContainer tw="min-h-[100vh]" >
        <Section 
        direction='col'
        hdr={
          <SectionHeaderContainer tw='justify-center'>
            <SectionHeaderTitle>Match wager</SectionHeaderTitle>
          </SectionHeaderContainer>}>
          <JoinGameCard 
            wagerType={game.wager.wagerType}  
            currencyType={game.wager.wagerCurrency}
            tokenAddress={SupportedWagerTokenAddresses(network?.id as number)[game.wager.wagerCurrency]}
            playerAddress={wallet.address}
            gameType={game.gameType.toUpperCase() as AllPossibleWegaTypes}
            playerUuid={user.uuid}
            wagerAmount={Number(utils.formatEther(game.wager.wagerAmount))}
            gameUuid={game.uuid}
            escrowId={game.wager.wagerHash as HexishString}
            gameId={game.id}
            gameAttributes={game.gameAttributes}
          />
        </Section>
      </MainContainer>
    </div>
  ) : <ComponentLoader tw="min-w-[559px] min-h-[494px]" />
}
export default JoinGamePage;

