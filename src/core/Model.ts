interface IModelConfig {
  baseUrl: string;
}

export class Model<T> {
  protected baseUrl: string;

  constructor(config: IModelConfig) {
    this.baseUrl = config.baseUrl;
  }

  public http = async <T extends {}>(
    url: string,
    requestInit?: RequestInit
  ): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (response.status === 204) return;
    const body = await response.json();
    return body;
  };

  public load = async (id: string): Promise<T> => {
    return this.get<T>(`${id}/`);
  };

  public search = async (query = ""): Promise<T[]> => {
    return this.get<T[]>(`?search=${query}`);
  };

  public get = async <T extends {}>(url: string): Promise<T> => {
    return this.http<T>(`${this.baseUrl}/${url}`);
  };

  public post = async <T extends {}>(
    url: string,
    body: Record<string, any>
  ): Promise<T> => {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.http<T>(`${this.baseUrl}/${url}`, options);
  };

  public patch = async <T extends {}>(
    id: string,
    body: Record<string, any>
  ): Promise<T> => {
    const options: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.http<T>(`${this.baseUrl}/${id}/`, options);
  };

  public delete = async <T extends {}>(id: string): Promise<T> => {
    const options: RequestInit = {
      method: "DELETE",
      // body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.http<T>(`${this.baseUrl}/${id}/`, options);
  };
}
