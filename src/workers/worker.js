import { log } from '../utils/consoleUtils.js';

onmessage = (event) => {
	console.log('Worker triggered');
	// log();
	const { code } = event.data;
	function onErrorFn(error) {
		postMessage({ error });
	}

	try {
		/** To display the final output  */
		const consoleOutput = [];

		/**
		 * TODO:
		 * 1. Over write more console methods
		 * 2. Separate customConsole logic from this file and maintane a special file for this.
		 */
		const customConsole = {
			// Overwrite console methods
			// ...console,
			log: (...args) => {
				const resultArr = args.map((arg) => {
					try {
						return typeof arg === 'object'
							? JSON.stringify(
									arg,
									(key, val) => {
										if (typeof val === 'function') {
											return val.toString();
										}
										return val;
									},
									2
								)
							: String(arg);
					} catch (e) {
						return '[Circular]';
					}
				});
				consoleOutput.push(resultArr.join(' '));
			},

			// FIXME:
			// log: (...args) => {
			// 	const resultArr = log(args);
			// 	consoleOutput.push(resultArr.join(''));
			// },
		};

		/**
		 * Using Function class we created a new function who's function name is executedCode,
		 * executedCode accepts two arguments, i.e code and console, in this case,
		 * code - Is the piece of code to be executed.
		 * console - Is the console object to bebug and print.
		 * */

		const functionBody = `
			"use strict"
			try{
				${code}
			}catch(error){
				onErrorFn(error);
				return "";
			}
			
		`;

		/** Function Defination and Instance creation  */
		const codeExecutionFunction = new Function('code', 'console', 'onErrorFn', functionBody);

		// function codeExecutionFunction (code, console, onErrorFn){
		// 	functionBody
		// }

		/** Fucntion calling */
		codeExecutionFunction(code, customConsole, onErrorFn);
		const output = consoleOutput.join('\n');

		/** Sending result back to main thread. */
		postMessage(output);
	} catch (error) {
		console.log('Error catched in catch block');
		onErrorFn(error);
		return;
	}
};
