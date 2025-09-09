FROM golang:1.23.9-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o go-invoice ./cmd/main.go

# Run stage
FROM alpine:3.19

WORKDIR /app

RUN apk --no-cache upgrade

COPY --from=builder /app/go-invoice .
COPY --from=builder /app/templates ./templates

EXPOSE 8080

CMD ["./go-invoice"]