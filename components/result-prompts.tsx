type ResultPromptsProps = {
  prompts: string[];
};

export function ResultPrompts({ prompts }: ResultPromptsProps) {
  return (
    <section className="space-y-4">
      <div className="max-w-2xl space-y-2">
        <p className="text-sm tracking-[0.28em] text-stone-300/60 uppercase">
          Journal Prompts
        </p>
        <h2 className="font-heading text-3xl font-semibold text-stone-50 sm:text-4xl">
          Carry the signal forward with a quieter question.
        </h2>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <article
            key={prompt}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
          >
            <p className="mb-3 text-xs tracking-[0.28em] text-stone-300/55 uppercase">
              Prompt {index + 1}
            </p>
            <p className="text-sm leading-7 text-stone-200/84">{prompt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
