export class CityWeather {
    constructor(coord, weather, base, main, visibility, wind, clouds, dt, timezone, name) {
        this.coord = coord;
        this.weather = weather;
        this.base = base;
        this.main = main;
        this.visibility = visibility;
        this.wind = wind;
        this.clouds = clouds;
        this.dt = dt;
        this.timezone = timezone;
        this.name = name;
    }
}
