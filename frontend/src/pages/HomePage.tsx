import { useTranslation } from "react-i18next"
import Card from "../components/Card"
import Subtitle from "../components/text/Subtitle"
import Title from "../components/text/Title"
import Avatar from "../components/Avatar"
import { getGreetingKeyByTime } from "../utils/getGreetingKeyByTime"
import TaskList from "../modules/todolist/features/sigletask/TaskList"
import ScrollArea from "../components/ScrollArea"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="grid min-h-screen gap-0.5 p-6 lg:h-screen lg:grid-cols-[1.25fr_1fr] lg:grid-rows-[auto_1fr_1fr]">
      <section className="lg:col-span-2 flex flex-row gap-3 px-3">
        <Avatar size="large" />
        <div>
          <Title bold="bold">{`${t(getGreetingKeyByTime())} Zesk`}</Title>
          <Subtitle variant="md" color="secondary" className="mt-1">
            {t("home.greeting.subtitle")}
          </Subtitle>
        </div>
        <Title variant="4xl" italic bold="bold" className="ml-auto shrink-0 self-center ">
          FOCUS FLOW
        </Title>
      </section>

      <Card className=" min-h-0 min-w-0 lg:row-span-2 [&>div]:h-full [&>div]:w-full [&>div]:flex [&>div]:flex-col">
        <Title variant="2xl" bold="bold">
          {t("home.cards.tasks.title")}
        </Title>
        <Subtitle variant="md" color="secondary" className="mt-2 mb-3">
          {t("home.cards.tasks.subtitle")}
        </Subtitle>
        <ScrollArea className="flex-1 min-h-0 pr-1">
          <TaskList />
        </ScrollArea>
      </Card>

      <Card className=" min-h-0 [&>div]:h-full [&>div]:w-full">
        <Title variant="2xl" bold="bold">
          {t("home.cards.focus.title")}
        </Title>
        <Subtitle variant="md" color="secondary" className="mt-2">
          {t("home.cards.focus.subtitle")}
        </Subtitle>
      </Card>

      <Card className=" min-h-0 [&>div]:h-full [&>div]:w-full">
        <Title variant="2xl" bold="bold">
          {t("home.cards.weekly_focus.title")}
        </Title>
        <Subtitle variant="md" color="secondary" className="mt-2">
          {t("home.cards.weekly_focus.subtitle")}
        </Subtitle>
      </Card>
    </main>
  )
}
