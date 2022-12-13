# Jak logowac wszysko w serwerach

Na serwerze korzystamy z 2 rodzajów wyświetlania danych:

1. Loggera
2. Logowania do bazy danych

# Kiedy uzywac czego

Loggera róznica między uzywaniem poszczególnych loggerów jest dośc znacząca.

## Logger

Korzystamy z niego w celu logowania bezpośrenio do kontenera dockera. Tutaj nalezy logowac dane które pojawiają się masowo. Są to logi które informują nas o:

1. Statusie serwera **_up/down_**
2. Statusie wykonania danej operacji np: User a fetch data from controller b
3. Poszczególnych błędów
4. **Podczas developmentu wykorzystujemy do wyświetlania danych**

## Logowanie do bazy danych

**Serwis logowania baz danych jeszcze nie powstał**

Kiedy go uzywamy:

1. Do logowania danych które potrzebuje np administrator (np próby logowania)

2. Do zachowywyania błędów krytycznych
3. Do statystyk związnanych z systemem

# Konwensja logowania z Loggerem

**===============_Wazne_===============**

Niektóre errory np `axios error` posiadają swoje atrybuty np `message`. Uwazaj co wyswietlasz bo takie dane moga zaiwerac dane wrazliwe

# .log

Słuzy do wyświetlania informacji odnośnie flow systemu

```
{
    method: nazwa metody w której jest uzyty,
    message: wiadomosc która chcemy przekazac
    extra:{
        tutaj wrzucamy wszysko co moze byc potrzebne,
    }
}
```

# .debug

```
{
    method: nazwa metody w której jest uzyty,
    message: wiadomosc która chcemy przekazac
    extra:{
        tutaj wrzucamy wszysko co moze byc potrzebne,
    }
    data:{
        logujemy wszystkie dane NIE WRAŻLIWE
    }
}
```

# .error

Logi tego typu uzywamy w bloku `trycatch` w instrukcji catch

```
{
    method: nazwa metody w której jest uzyty,
    error: errror która chcemy przekazac
    extra:{
        tutaj wrzucamy wszysko co moze byc potrzebne,
    }
}
```
