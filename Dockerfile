# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only project and solution files first (faster caching)
COPY *.sln .
COPY *.csproj ./


# Restore dependencies
RUN dotnet restore

# Copy the rest of the source
COPY . .

# Publish the app
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5000
ENTRYPOINT ["dotnet", "FYPBackend.dll"]
