import pino from "pino";

const levels = {
    crit: 60,
    error: 50,
    warn: 40,
    notice: 30,
    info: 20,
  };

  const streams = Object.keys(levels).map((level) => {
    return {
      level: level,
      stream: pino.destination(`./logs/app-${level}.log`),
    };
  });
  
  const logger = pino(
    {
      level: process.env.PINO_LOG_LEVEL || 'info',
      customLevels: levels,
      useOnlyCustomLevels: true,
      formatters: {
        level: (label) => {
          return { level: label };
        },
      },
    },
  
    pino.multistream(streams as any, {
      levels,
      dedupe: true,
    })
  );

export default logger;