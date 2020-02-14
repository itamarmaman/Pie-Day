import React, { useState } from 'react';
import AnswerOriginalQuestion from './AnswerOriginalQuestion'
import AnswerAlternateQuestion from './AnswerAlternateQuestion'

export default function QuestionForm({leg, onOrginalCorrectAnswer, onAlternateCorrectAnswer, onSkipingQuestion, uploadImage, showSucsess}) {
  
  const [questionType, onQuestionType] = useState(true)
  
  function onMovingToAlternate() {
    onQuestionType(false)
  }
  function onMovingToOriginal() {
    onQuestionType(true)
  }
  function onSkiping() {
    onQuestionType(true)
    onSkipingQuestion()
  }
  
  if (questionType) {
    return (
      <div>
        <AnswerOriginalQuestion
        leg = {leg}
        onCorrectAnswer = {onOrginalCorrectAnswer}
        onMovingToAlternate = {onMovingToAlternate}
        uploadImage = {uploadImage}
        showSucsess = {showSucsess}
        ></AnswerOriginalQuestion>
      </div>
      )
    }
  
    return (
      <div>
        <AnswerAlternateQuestion
        leg = {leg}
        onCorrectAnswer ={onAlternateCorrectAnswer}
        onMovingToOriginal = {onMovingToOriginal}
        onSkiping = {onSkiping}
        showSucsess = {showSucsess}
        >
        </AnswerAlternateQuestion>
      </div>
  )

}