

export interface DavisCurrentObservation {
    et_day: string;
    et_month: string;
    et_year: string;
    rain_day_in: string;
    rain_month_in: string;
    rain_year_in: string;
    solar_radiation: string;
    temp_day_high_f: string;
    temp_day_high_time: string;
    temp_day_low_f: string;
    temp_day_low_time: string;
    uv_index: string;
}

export interface DataDavisDt {
    existe: boolean;
    dewpoint_c: string;
    pressure_mb: string;
    pressure_string: string;
    relative_humidity: string;
    temp_c: string;
    temperature_string: string;
    wind_degrees: string;
    wind_dir: string;
    wind_kt: string;
    davis_current_observation: DavisCurrentObservation;
}

