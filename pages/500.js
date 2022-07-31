import Head from "next/head";

import LeftMenu from "../components/leftMenu";
import MainContent from "../components/mainContent";
import ShadowPanel from "../components/shadowPanel";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            <LeftMenu></LeftMenu>

            <MainContent>
                <ShadowPanel type="simple" title="500" position="center">
                    <p>
                        Если вы видите эту страницу, значит произошла какая-то
                        ошибка. Попробуйте повторить свои действия позже. Если
                        ошибка повториться, то сообщите нам.
                        <br />А пока вы можете выберать любой другой раздел в
                        меню слева.
                    </p>
                </ShadowPanel>
            </MainContent>
        </div>
    );
}
