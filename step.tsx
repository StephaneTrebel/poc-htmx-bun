import { Fragment } from 'preact';

type Step = 'first' | 'second' | 'last';

const breadcrumb_active_item = (item: string) => (
  <li class="breadcrumb-item active" aria-current="page">
    {item}
  </li>
);

const breadcrumb_inactive_item = (item: string, target_step: Step) => (
  <li class="breadcrumb-item">
    <a
      href="#"
			hx-get={'/breadcrumb/get-' + target_step}
      hx-target="#breadcrumb-container"
    >
      {item}
    </a>
  </li>
);

function PreviousStep(props: { step: Step | null }) {
  return props.step ? (
    <a
      class="btn btn-primary"
      href="#"
			hx-get={'/breadcrumb/get-' + props.step}
      hx-target="#breadcrumb-container"
    >
      Previous
    </a>
  ) : null;
}

function NextStep(props: { step: Step | null }) {
  return props.step ? (
    <a
      class="btn btn-primary"
      href="#"
			hx-get={'/breadcrumb/get-' + props.step}
      hx-target="#breadcrumb-container"
    >
      Next
    </a>
  ) : null;
}

export default function Step(props: { step: Step; step_content: string }) {
  return (
    <Fragment>
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          {props.step == 'first'
            ? breadcrumb_active_item('Step 1')
            : breadcrumb_inactive_item('Step 1', 'first')}
          {props.step == 'second'
            ? breadcrumb_active_item('Step 2')
            : breadcrumb_inactive_item('Step 2', 'second')}
          {props.step == 'last'
            ? breadcrumb_active_item('Step 3')
            : breadcrumb_inactive_item('Step 3', 'last')}
        </ol>
      </nav>

      <div id="breadcrumb-content">{props.step_content}</div>

      <div id="breadcrumb-footer">
        <PreviousStep
          step={
            props.step === 'first'
              ? null
              : props.step === 'second'
                ? 'first'
                : 'second'
          }
        />
        <NextStep
          step={
            props.step === 'last'
              ? null
              : props.step === 'second'
                ? 'last'
                : 'second'
          }
        />
      </div>
    </Fragment>
  );
}
