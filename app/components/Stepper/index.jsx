// @flow
import React, { Fragment } from 'react'
import classNames from 'classnames'
import styles from './index.scss'

type Props = {
  steps: string[],
  currentStep?: number,
  className?: string,
}

export const Stepper = ({
  steps,
  currentStep = 1,
  className,
  ...props
}: Props) => (
  <div className={classNames(styles.container, className)} {...props}>
    {steps.map((step, index) => {
      const fixedIndex = index + 1

      return (
        <Fragment key={index}>
          <div className={styles.stepContainer}>
            <span
              className={classNames(styles.step, {
                [styles.stepCurrent]: fixedIndex === currentStep,
                [styles.stepComplete]: fixedIndex < currentStep,
                [styles.stepIncomplete]: fixedIndex > currentStep,
              })}
            >
              {fixedIndex}
            </span>

            <span
              className={classNames(styles.stepText, {
                [styles.stepTextCurrent]: fixedIndex === currentStep,
                [styles.stepTextComplete]: fixedIndex < currentStep,
                [styles.stepTextIncomplete]: fixedIndex > currentStep,
              })}
            >
              {step}
            </span>
          </div>

          {fixedIndex < steps.length && (
            <div
              className={classNames(styles.stepLine, {
                [styles.stepLineComplete]: fixedIndex < currentStep,
                [styles.stepLineIncomplete]: fixedIndex >= currentStep,
              })}
            />
          )}
        </Fragment>
      )
    })}
  </div>
)
