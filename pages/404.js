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
                <ShadowPanel type="simple" title="404" position="center">
                    <p>
                        Такой страницы не существует. Возможно, вы попали сюда
                        по ошибке.
                        <br />
                        Выберите необходимый вам раздел в меню слева
                    </p>
                </ShadowPanel>
            </MainContent>
        </div>
    );
}
