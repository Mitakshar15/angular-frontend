export interface BaseApiResponse {
    respType: string;
    metadata: {
      timestamp: string;
      traceId: string;
    };
    status: {
      statusCode: number;
      statusMessage: string;
      statusMessageKey: string;
    };
  }