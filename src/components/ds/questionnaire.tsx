import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

export type DsQuestionnaireProps = React.ComponentProps<typeof Questionnaire>
export function DsQuestionnaire(props: DsQuestionnaireProps) {
  return <Questionnaire {...props} />
}

export type DsQuestionnaireActionsProps = React.ComponentProps<typeof QuestionnaireActions>
export function DsQuestionnaireActions(props: DsQuestionnaireActionsProps) {
  return <QuestionnaireActions {...props} />
}

export type DsQuestionnaireChoiceProps = React.ComponentProps<typeof QuestionnaireChoice>
export function DsQuestionnaireChoice(props: DsQuestionnaireChoiceProps) {
  return <QuestionnaireChoice {...props} />
}

export type DsQuestionnaireChoiceDescriptionProps = React.ComponentProps<typeof QuestionnaireChoiceDescription>
export function DsQuestionnaireChoiceDescription(props: DsQuestionnaireChoiceDescriptionProps) {
  return <QuestionnaireChoiceDescription {...props} />
}

export type DsQuestionnaireChoicesProps = React.ComponentProps<typeof QuestionnaireChoices>
export function DsQuestionnaireChoices(props: DsQuestionnaireChoicesProps) {
  return <QuestionnaireChoices {...props} />
}

export type DsQuestionnaireDescriptionProps = React.ComponentProps<typeof QuestionnaireDescription>
export function DsQuestionnaireDescription(props: DsQuestionnaireDescriptionProps) {
  return <QuestionnaireDescription {...props} />
}

export type DsQuestionnaireErrorProps = React.ComponentProps<typeof QuestionnaireError>
export function DsQuestionnaireError(props: DsQuestionnaireErrorProps) {
  return <QuestionnaireError {...props} />
}

export type DsQuestionnaireInputProps = React.ComponentProps<typeof QuestionnaireInput>
export function DsQuestionnaireInput(props: DsQuestionnaireInputProps) {
  return <QuestionnaireInput {...props} />
}

export type DsQuestionnaireItemProps = React.ComponentProps<typeof QuestionnaireItem>
export function DsQuestionnaireItem(props: DsQuestionnaireItemProps) {
  return <QuestionnaireItem {...props} />
}

export type DsQuestionnaireNextProps = React.ComponentProps<typeof QuestionnaireNext>
export function DsQuestionnaireNext(props: DsQuestionnaireNextProps) {
  return <QuestionnaireNext {...props} />
}

export type DsQuestionnairePreviousProps = React.ComponentProps<typeof QuestionnairePrevious>
export function DsQuestionnairePrevious(props: DsQuestionnairePreviousProps) {
  return <QuestionnairePrevious {...props} />
}

export type DsQuestionnaireProgressProps = React.ComponentProps<typeof QuestionnaireProgress>
export function DsQuestionnaireProgress(props: DsQuestionnaireProgressProps) {
  return <QuestionnaireProgress {...props} />
}

export type DsQuestionnaireSkipProps = React.ComponentProps<typeof QuestionnaireSkip>
export function DsQuestionnaireSkip(props: DsQuestionnaireSkipProps) {
  return <QuestionnaireSkip {...props} />
}

export type DsQuestionnaireSubmitProps = React.ComponentProps<typeof QuestionnaireSubmit>
export function DsQuestionnaireSubmit(props: DsQuestionnaireSubmitProps) {
  return <QuestionnaireSubmit {...props} />
}

export type DsQuestionnaireTitleProps = React.ComponentProps<typeof QuestionnaireTitle>
export function DsQuestionnaireTitle(props: DsQuestionnaireTitleProps) {
  return <QuestionnaireTitle {...props} />
}
