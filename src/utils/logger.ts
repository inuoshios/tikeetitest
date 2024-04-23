// custom logger - can also be customized

export function infoLogger(name: string, details?: any) {
  process.stdout.write(`[INFO] ${name} \t ${JSON.stringify(details) ?? ''}` + '\n');
}

export function errorLogger(name: string, details?: any) {
  process.stderr.write(`[ERROR] ${name} \t ${JSON.stringify(details) ?? ''}` + '\n');
}