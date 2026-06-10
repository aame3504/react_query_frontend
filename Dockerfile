#Jenkins LTS 이미지 사용
FROM jenkins/jenkins:lts-jdk17

#root 권한으로 전환
USER root

#Docker CLI 설치 (선택사항)
RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

#Jenkins 플러그인 사전 설치
RUN jenkins-plugin-cli --plugins \
    git \
    workflow-aggregator \
    docker-workflow \
    blueocean

#Jenkins 홈 디렉토리 권한 설정
RUN chown -R jenkins:jenkins /var/jenkins_home

#Jenkins 사용자로 복귀
USER jenkins

#Jenkins 기본 포트
EXPOSE 8080

#Jenkins Agent 포트
EXPOSE 50000
