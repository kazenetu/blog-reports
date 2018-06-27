FROM jenkins/jenkins:lts

ENV JAVA_OPTS=-Duser.timezone=Asia/Tokyo

# set timezone for Java runtime arguments
USER root

# set timezone for OS by root
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# install dotnet-sdk-2.1
RUN apt-get update
RUN apt-get install -y curl libunwind8 gettext apt-transport-https

RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
RUN wget -q https://packages.microsoft.com/config/debian/9/prod.list
RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
RUN chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
RUN chown root:root /etc/apt/sources.list.d/microsoft-prod.list

#CMD /bin/sh -c apt-get update
RUN apt-get update
RUN apt-get install -y dotnet-sdk-2.1

USER jenkins