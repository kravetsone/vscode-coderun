export interface __NEXT_DATA__ {
	props: Props;
	page: string;
	query: Query;
	buildId: string;
	assetPrefix: string;
	isFallback: boolean;
	isExperimentalCompile: boolean;
	gssp: boolean;
	scriptLoader: any[];
}

export interface Query {
	currentPage: string;
	pageSize: string;
	selectionSlug: string;
	slug: string[];
}

export interface Props {
	pageProps: PageProps;
	__N_SSP: boolean;
}

export interface PageProps {
	prefix?: any;
	nonce: string;
	reqId: string;
	fallback: Fallback;
	latestSubmission?: any;
	title: string;
	description: string;
	canonical: string;
	navigation: Navigation;
	page: string;
	values: Values;
	primarySeason: PrimarySeason;
	yndxBugFormId: string;
	metrikaCounterIds: number[];
	metrikaOptions: MetrikaOptions;
	ssrFallback: SsrFallback;
	cookies: Cookies;
	userAgent: UserAgent;
	features: number;
}

export interface UserAgent {
	device: Device;
}

export interface Device {
	type?: any;
}

export interface Cookies {
	coding_theme?: any;
	coding_compiler?: any;
	yndx_feature_flags?: any;
	yandexuid: string;
}

export interface SsrFallback {
	passport: Passport2;
	user: Fallback;
}

export interface Passport2 {
	passport: Passport;
}

export interface Passport {
	url: string;
}

export interface MetrikaOptions {
	clickmap: boolean;
	trackLinks: boolean;
	accurateTrackBounce: boolean;
	webvisor: boolean;
}

export interface PrimarySeason {
	slug: string;
	title: string;
	startingAt: string;
	finishingAt: string;
}

export interface Values {
	[key: string]: _9ueceq;
}

export interface _9ueceq {
	problemContextId: number;
	slug: string;
	title: string;
	difficulty: string;
	tags: string[];
	statements: Statements;
	solutionState: string;
	compilers: Compiler[];
	fileSettings: FileSettings;
	number: number;
	order: number;
	isMultiFileSubmitsExpected: boolean;
	type: string;
	pictureProblemDetails?: any;
	selectionBrief: SelectionBrief;
}

export interface SelectionBrief {
	slug: string;
	title: string;
}

export interface FileSettings {
	inputFileName: string;
	outputFileName: string;
	allowStdin: boolean;
	allowStdout: boolean;
	maxSourceSizeBytes: number;
}

export interface Compiler {
	slug: string;
	available: boolean;
	unavailableReason?: any;
	title: string;
	version: string;
	highlight: string;
	runtimeLimits: RuntimeLimits;
}

export interface RuntimeLimits {
	timeLimitMillis: number;
	memoryLimitBytes: number;
}

export interface Statements {
	statementType: string;
	legend: string;
	inputFormat: string;
	outputFormat: string;
	notes?: any;
	samples: Sample[];
}

export interface Sample {
	input: Input;
	output: Input;
}

export interface Input {
	s3Key: string;
	key: string;
	bucket: string;
	contentType: string;
	size: number;
	fileName: string;
	content: string;
}

export interface Navigation {
	catalogue: string;
	next: string;
	previous?: any;
	hasRandom: boolean;
	totalCount: number;
}

export type Fallback = {};
