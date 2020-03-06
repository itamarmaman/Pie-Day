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

  return (
    <div>
      
    {questionType ? 
     <AnswerOriginalQuestion
      leg = {leg}
      onCorrectAnswer = {onOrginalCorrectAnswer}
      onMovingToAlternate = {onMovingToAlternate}
      uploadImage = {uploadImage}
      showSucsess = {showSucsess}
      onSkiping = {onSkiping}
      />
    :
    <AnswerAlternateQuestion
      leg = {leg}
      onCorrectAnswer ={onAlternateCorrectAnswer}
      onMovingToOriginal = {onMovingToOriginal}
      onSkiping = {onSkiping}
      uploadImage = {uploadImage}
      showSucsess = {showSucsess}
      />
    }
    </div>
  )
}